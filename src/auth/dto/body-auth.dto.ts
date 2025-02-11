import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, IsStrongPassword, Matches, ValidateNested } from 'class-validator';
import { AddressDto } from 'src/address/entities/addresDto';

export class LogInDto {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsStrongPassword(
    { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'Password must be at least 6 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.', },
  )
  @ApiProperty({ example: 'striN@g123' })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'token' })
  @IsString()
  token: string;
}

export class SignUpUserDto {

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

  @ApiProperty({ type: [AddressDto], example: [{ street: '123 Main St', city: 'Anytown', country: 'USA' }] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses?: AddressDto[];

}

