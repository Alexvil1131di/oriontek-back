import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional, IsString, IsStrongPassword, IsUUID, Matches, ValidateNested } from 'class-validator';
import { AddressDto, CreateAddressDto, UpsertAddressDto } from 'src/address/entities/addresDto';

export class CreateClientDto {

    @ApiProperty({ example: 'example@gmail.com' })
    @IsEmail()
    @Matches(/^\S*$/, { message: 'Name should not contain empty spaces' })
    email: string;

    @ApiProperty({ example: 'Pass@Word' })
    @IsStrongPassword(
        { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, },
        { message: 'Password must be at least 6 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.', }
    )
    password: string;

    @ApiProperty({ example: 'John' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    name: string;

    @ApiProperty({ example: 'Doe' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    lastname: string;

    @ApiProperty({ example: '1234567890' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsOptional()
    phone: string;

    @ApiProperty({ example: '1234567890' })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    addresses?: AddressDto[];

}

export class clientDto extends OmitType(CreateClientDto, ['password'] as const) {
    @ApiProperty({ example: 1 })
    @IsUUID()
    id: string;
}


export class UpdateClientDto extends PartialType(OmitType(CreateClientDto, ['email', 'addresses'])) {
    @ApiProperty({ example: '1234567890' })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpsertAddressDto)
    addresses?: UpsertAddressDto[];
}