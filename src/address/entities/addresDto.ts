import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class AddressDto {
    @ApiProperty({ example: '1234 Main St' })
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({ example: 'City' })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ example: 'State' })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ example: 'Country' })
    @IsString()
    @IsNotEmpty()
    country: string;

    @ApiProperty({ example: '12345' })
    @IsString()
    @IsNotEmpty()
    zip: string;

}

export class CreateAddressDto extends AddressDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    clientId: number;
}

export class UpsertAddressDto extends AddressDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    id: number;
}