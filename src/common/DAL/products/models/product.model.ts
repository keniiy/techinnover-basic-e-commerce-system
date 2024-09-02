import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Collections } from '@enums/index';

@Schema({ collection: Collections.PRODUCTS, timestamps: true })
export class ProductModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: Collections.USERS, required: true })
  ownerId: Types.ObjectId;

  @Prop({ required: true, default: false })
  isApproved: boolean;
}

export type ProductDocument = ProductModel &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };
export const ProductSchema = SchemaFactory.createForClass(ProductModel);
ProductSchema.plugin(mongoosePaginate);
