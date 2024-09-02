import { PopulateOptions, Types } from 'mongoose';
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
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { FindProductDto } from '../dto/version1/find-product.dto';
import { FindProductsDto } from '../dto/version1';
import { UserRole } from '@common/enums';

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
      ownerId: new Types.ObjectId(user.id),
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
      _id: new Types.ObjectId(productId),
      ownerId: new Types.ObjectId(user.id),
    });

    if (!product) {
      return new ProductErrorResponseDto(
        HttpStatus.NOT_FOUND,
        'Product not found or not owned by user',
      );
    }

    const updatedProduct = await this.productRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(productId) },
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
      _id: new Types.ObjectId(productId),
      ownerId: new Types.ObjectId(user.id),
    });

    if (!product) {
      return new ProductErrorResponseDto(
        HttpStatus.NOT_FOUND,
        'Product not found or not owned by user',
      );
    }

    await this.productRepository.findOneAndDelete({
      _id: new Types.ObjectId(productId),
    });

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
    const product = await this.productRepository.findById(
      new Types.ObjectId(productId).toString(),
    );

    if (!product) {
      return new ProductErrorResponseDto(
        HttpStatus.NOT_FOUND,
        'Product not found',
      );
    }

    product.isApproved = true;
    const approvedProduct = await this.productRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(productId) },
      product,
    );

    const owner = await this.userRepository.findById(
      approvedProduct.ownerId.toString(),
    );
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
    const condition: any = { isApproved: true };
    if (findProductsDto.search) {
      condition.$or = [
        { name: { $regex: findProductsDto.search, $options: 'i' } },
        { description: { $regex: findProductsDto.search, $options: 'i' } },
      ];
    }

    const products = await this.productRepository.findManyWithPagination(
      condition,
      findProductsDto,
    );

    const ownerDtos = await Promise.all(
      products.docs.map(async (product) => {
        const owner = await this.userRepository.findById(
          product.ownerId.toString(),
        );
        return new UserResponseDto(owner);
      }),
    );

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
    if (!Types.ObjectId.isValid(productId)) {
      throw new BadRequestException('Invalid product ID format');
    }

    const populateOptions = findProductDto.populate
      ? Array.isArray(findProductDto.populate)
        ? findProductDto.populate.map((option) => option)
        : [findProductDto.populate]
      : undefined;

    const product = await this.productRepository.findOne(
      { _id: new Types.ObjectId(productId), isApproved: true },
      undefined,
      populateOptions
        ? { populate: populateOptions as string[] | PopulateOptions[] }
        : undefined,
    );

    if (!product) {
      return new ProductErrorResponseDto(
        HttpStatus.NOT_FOUND,
        'Product not found',
      );
    }

    const owner = await this.userRepository.findById(
      product.ownerId.toString(),
    );
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
    if (!Types.ObjectId.isValid(user.id)) {
      throw new BadRequestException('Invalid user ID format');
    }

    const condition: any = { ownerId: new Types.ObjectId(user.id) };
    if (findProductsDto.search) {
      condition.$or = [
        { name: { $regex: findProductsDto.search, $options: 'i' } },
        { description: { $regex: findProductsDto.search, $options: 'i' } },
      ];
    }

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

  async findAllProducts(
    findProductsDto: FindProductsDto,
  ): Promise<
    ProductSuccessResponseDto<ProductResponseDto[]> | ProductErrorResponseDto
  > {
    const condition: any = {};
    if (findProductsDto.isApproved !== undefined) {
      condition['isApproved'] = findProductsDto.isApproved;
    }
    if (findProductsDto.search) {
      condition.$or = [
        { name: { $regex: findProductsDto.search, $options: 'i' } },
        { description: { $regex: findProductsDto.search, $options: 'i' } },
      ];
    }

    const products = await this.productRepository.findManyWithPagination(
      condition,
      findProductsDto,
    );

    const ownerDtos = await Promise.all(
      products.docs.map(async (product) => {
        if (findProductsDto.populate?.includes('ownerId')) {
          const owner = await this.userRepository.findById(
            product.ownerId.toString(),
          );
          return new UserResponseDto(owner);
        } else {
          return new UserResponseDto({
            id: product.ownerId.toString(),
            name: 'Unknown',
            role: UserRole.USER,
          });
        }
      }),
    );

    return new ProductSuccessResponseDto(
      HttpStatus.OK,
      'Products retrieved successfully',
      products.docs.map(
        (product, index) => new ProductResponseDto(product, ownerDtos[index]),
      ),
    );
  }
}
