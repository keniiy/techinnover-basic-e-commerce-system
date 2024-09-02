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
  async getAllProducts(@Query() findProductsDto: FindProductsDto) {
    return this.productService.findAllProducts(findProductsDto);
  }
}
