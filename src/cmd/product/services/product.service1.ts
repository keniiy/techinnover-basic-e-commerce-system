import { UserRepository } from '@common/DAL';
import { ProductModel } from '@common/DAL/products/models';
import { ProductRepository } from '@common/DAL/products/repositories/product.repository';
import {
  ProductSuccessResponseDto,
  ProductResponseDto,
  ProductErrorResponseDto,
  UserResponseDto,
} from '@common/dtos';
import { IUserAuthenticated } from '@common/interfaces';
import { HttpStatus, Injectable } from '@nestjs/common';
import { FindProductDto } from '../dto/version1/find-product.dto';
import { FindProductsDto } from '../dto/version1';

@Injectable()
export class ProductServiceVersion1 {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createProduct(
    user: IUserAuthenticated,
    productData: Partial<ProductModel>,
  ): Promise<
    ProductSuccessResponseDto<ProductResponseDto> | ProductErrorResponseDto
  > {
    const newProduct = await this.productRepository.create({
      ...productData,
      ownerId: user.id,
      isApproved: false,
    });

    const owner = await this.userRepository.findById(user.id);
    const ownerDto = new UserResponseDto(owner);

    return new ProductSuccessResponseDto(
      HttpStatus.CREATED,
      'Product created successfully',
      new ProductResponseDto(newProduct, ownerDto),
    );
  }

  async updateProduct(
    user: IUserAuthenticated,
    productId: string,
    updateData: Partial<ProductModel>,
  ): Promise<
    ProductSuccessResponseDto<ProductResponseDto> | ProductErrorResponseDto
  > {
    const product = await this.productRepository.findOne({
      _id: productId,
      ownerId: user.id,
    });

    if (!product) {
      return new ProductErrorResponseDto(
        HttpStatus.NOT_FOUND,
        'Product not found or not owned by user',
      );
    }

    const updatedProduct = await this.productRepository.findOneAndUpdate(
      { _id: productId },
      updateData,
    );

    const owner = await this.userRepository.findById(user.id);
    const ownerDto = new UserResponseDto(owner);

    return new ProductSuccessResponseDto(
      HttpStatus.OK,
      'Product updated successfully',
      new ProductResponseDto(updatedProduct, ownerDto),
    );
  }

  async deleteProduct(
    user: IUserAuthenticated,
    productId: string,
  ): Promise<ProductSuccessResponseDto<void> | ProductErrorResponseDto> {
    const product = await this.productRepository.findOne({
      _id: productId,
      ownerId: user.id,
    });

    if (!product) {
      return new ProductErrorResponseDto(
        HttpStatus.NOT_FOUND,
        'Product not found or not owned by user',
      );
    }

    await this.productRepository.findOneAndDelete({ _id: productId });

    return new ProductSuccessResponseDto(
      HttpStatus.OK,
      'Product deleted successfully',
      null,
    );
  }

  async approveProduct(
    productId: string,
  ): Promise<
    ProductSuccessResponseDto<ProductResponseDto> | ProductErrorResponseDto
  > {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      return new ProductErrorResponseDto(
        HttpStatus.NOT_FOUND,
        'Product not found',
      );
    }

    product.isApproved = true;
    const approvedProduct = await this.productRepository.findOneAndUpdate(
      { _id: productId },
      product,
    );

    const owner = await this.userRepository.findById(product.ownerId);
    const ownerDto = new UserResponseDto(owner);

    return new ProductSuccessResponseDto(
      HttpStatus.OK,
      'Product approved successfully',
      new ProductResponseDto(approvedProduct, ownerDto),
    );
  }

  async findApprovedProducts(
    findProductsDto: FindProductsDto,
  ): Promise<
    ProductSuccessResponseDto<ProductResponseDto[]> | ProductErrorResponseDto
  > {
    const condition = { isApproved: true };
    const products = await this.productRepository.findManyWithPagination(
      condition,
      findProductsDto,
    );

    const owners = await Promise.all(
      products.docs.map((product) =>
        this.userRepository.findById(product.ownerId),
      ),
    );
    const ownerDtos = owners.map((owner) => new UserResponseDto(owner));

    return new ProductSuccessResponseDto(
      HttpStatus.OK,
      'Approved products retrieved successfully',
      products.docs.map(
        (product, index) => new ProductResponseDto(product, ownerDtos[index]),
      ),
    );
  }

  async findProduct(
    productId: string,
    findProductDto: FindProductDto,
  ): Promise<
    ProductSuccessResponseDto<ProductResponseDto> | ProductErrorResponseDto
  > {
    const product = await this.productRepository.findOne(
      { _id: productId, isApproved: true },
      findProductDto.populate,
    );

    if (!product) {
      return new ProductErrorResponseDto(
        HttpStatus.NOT_FOUND,
        'Product not found',
      );
    }

    const owner = await this.userRepository.findById(product.ownerId);
    const ownerDto = new UserResponseDto(owner);

    return new ProductSuccessResponseDto(
      HttpStatus.OK,
      'Product retrieved successfully',
      new ProductResponseDto(product, ownerDto),
    );
  }

  async findUserProducts(
    user: IUserAuthenticated,
    findProductsDto: FindProductsDto,
  ): Promise<
    ProductSuccessResponseDto<ProductResponseDto[]> | ProductErrorResponseDto
  > {
    const condition = { ownerId: user.id };
    const products = await this.productRepository.findManyWithPagination(
      condition,
      findProductsDto,
    );

    const ownerDto = new UserResponseDto(
      await this.userRepository.findById(user.id),
    );

    return new ProductSuccessResponseDto(
      HttpStatus.OK,
      'User products retrieved successfully',
      products.docs.map((product) => new ProductResponseDto(product, ownerDto)),
    );
  }
}
