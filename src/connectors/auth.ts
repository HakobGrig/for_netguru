import {
    IsEnum,
    IsNumber,
    IsString,
    Length,
} from 'class-validator';

enum USER_ROLE {
    BASIC="basic",
    PREMIUM='premium',
}

export class UserAuthData {
    @IsNumber()
    userId!: number;

    @IsString()
    name!: string;

    @IsEnum(USER_ROLE)
    role!: USER_ROLE;

    @IsNumber()
    iat!: number;

    @IsNumber()
    exp!: number;

    @IsString()
    iss!: string;

    @IsString()
    sub!: string;
}