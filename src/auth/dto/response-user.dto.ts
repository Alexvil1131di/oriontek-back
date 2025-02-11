import { ApiProperty, OmitType } from "@nestjs/swagger";
import { SignUpUserDto } from "./body-auth.dto";

export class ResponseLoginDto extends OmitType(SignUpUserDto, ['password']) {
    @ApiProperty({ example: 'string' })
    token: string;

    @ApiProperty({ example: 'string' })
    zoho_access_token: string;

    @ApiProperty({ example: '15' })
    id: number;
}
