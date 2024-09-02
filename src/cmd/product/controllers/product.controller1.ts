import { ProductModel } from '@common/DAL/products/models';
import { AuthenticatedUser, Roles } from '@common/decorators';
import {
  ProductSuccessResponseDto,
  ProductResponseDto,
  ProductErrorResponseDto,
} from '@common/dtos';
import { UserRole } from '@common/enums';
import { JwtAuthGuard } from '@common/guards';
import { IUserAuthenticated } from '@common/interfaces';
import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FindProductsDto, FindProductDto } from '../dto/version1';
import { ProductServiceVersion1 } from '../services/product.service1';
import { CreateProductDto } from '../dto/version1/create-product.dto';
import { RolesGuard } from '@common/guards/roles.guard';

@ApiTags('Product Management V1')
@ApiBearerAuth()
@Controller({
  path: 'products',
  version: '1',
})
export class ProductControllerVersion1 {
  constructor(private readonly productService: ProductServiceVersion1) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: ProductSuccessResponseDto<ProductResponseDto>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ProductErrorResponseDto,
  })
  /**
   * Creates a new product.
   *
   * @param user The authenticated user making the request.
   * @param createProductDto The data for the new product.
   * @returns A successful response with the created product data.
   */
  async createProduct(
    @AuthenticatedUser() user: IUserAuthenticated,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(user, createProductDto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get All Products of Authenticated User' })
  @ApiQuery({ type: FindProductsDto })
  @ApiResponse({
    status: 200,
    description: 'User products retrieved successfully',
    type: ProductSuccessResponseDto<ProductResponseDto[]>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ProductErrorResponseDto,
  })
  /**
   * Retrieves all products of the authenticated user.
   *
   * @param user The authenticated user making the request.
   * @param findProductsDto The pagination and search filter options.
   * @returns A successful response with the user's products data.
   */
  async getUserProducts(
    @AuthenticatedUser() user: IUserAuthenticated,
    @Query() findProductsDto: FindProductsDto,
  ) {
    return this.productService.findUserProducts(user, findProductsDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
    type: ProductSuccessResponseDto<ProductResponseDto>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ProductErrorResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found or not owned by user',
    type: ProductErrorResponseDto,
  })
  /**
   * Updates a product.
   * @param user The authenticated user making the request.
   * @param productId The ID of the product to update.
   * @param updateData The partial product data to update.
   * @returns A successful response with the updated product data, or a failure response if the product is not found or not owned by user.
   */
  async updateProduct(
    @AuthenticatedUser() user: IUserAuthenticated,
    @Param('id') productId: string,
    @Body() updateData: Partial<ProductModel>,
  ) {
    return this.productService.updateProduct(user, productId, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Product' })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
    type: ProductSuccessResponseDto<void>,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found or not owned by user',
    type: ProductErrorResponseDto,
  })
  /**
   * Deletes a product.
   * @param user The authenticated user making the request.
   * @param productId The ID of the product to delete.
   * @returns A successful response with no data, or a failure response if the product is not found or not owned by user.
   */
  async deleteProduct(
    @AuthenticatedUser() user: IUserAuthenticated,
    @Param('id') productId: string,
  ) {
    return this.productService.deleteProduct(user, productId);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Approve Product (Admin Only)' })
  @ApiResponse({
    status: 200,
    description: 'Product approved successfully',
    type: ProductSuccessResponseDto<ProductResponseDto>,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    type: ProductErrorResponseDto,
  })
  /**
   * Approves a product.
   * @param productId The ID of the product to approve.
   * @returns A successful response with the approved product data, or a failure response if the product is not found.
   */
  async approveProduct(@Param('id') productId: string) {
    return this.productService.approveProduct(productId);
  }

  @Get('approved')
  @ApiOperation({ summary: 'Get Approved Products (Public)' })
  @ApiQuery({ type: FindProductsDto })
  @ApiResponse({
    status: 200,
    description: 'Approved products retrieved successfully',
    type: ProductSuccessResponseDto<ProductResponseDto[]>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ProductErrorResponseDto,
  })
  /**
   * Retrieves all approved products.
   * @param findProductsDto The pagination and search filter options.
   * @returns A successful response with the approved products data.
   */
  async getApprovedProducts(@Query() findProductsDto: FindProductsDto) {
    return this.productService.findApprovedProducts(findProductsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Single Approved Product' })
  @ApiQuery({ type: FindProductDto })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully',
    type: ProductSuccessResponseDto<ProductResponseDto>,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
    type: ProductErrorResponseDto,
  })
  /**
   * Retrieves a single approved product.
   * @param productId The ID of the product to retrieve.
   * @param findProductDto The pagination and search filter options.
   * @returns A successful response with the product data.
   */
  async getProduct(
    @Param('id') productId: string,
    @Query() findProductDto: FindProductDto,
  ) {
    return this.productService.findProduct(productId, findProductDto);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get All Products (Admin Only)' })
  @ApiQuery({ type: FindProductsDto })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
    type: ProductSuccessResponseDto<ProductResponseDto[]>,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: ProductErrorResponseDto,
  })
  /**
   * Retrieves all products (admin only).
   * @param findProductsDto The pagination and search filter options.
   * @returns A successful response with the products data.
   */
  async getAllProducts(@Query() findProductsDto: FindProductsDto) {
    return this.productService.findAllProducts(findProductsDto);
  }
}
