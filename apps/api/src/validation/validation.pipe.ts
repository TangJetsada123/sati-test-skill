import { PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { Schema } from 'yup';

export class YupValidatorPipe implements PipeTransform {
    constructor(private readonly schema: Schema<{}>){}

    async transform(value: any, metadata: ArgumentMetadata) {
        console.log(value)
        try{
            await this.schema.validate(value,{abortEarly:false})
        }catch(err){
            const errorMessage  = err.inner.map((ed)=>{
                return ed.errors
            })
            throw new BadRequestException(errorMessage)
        }
        return value
    }
}