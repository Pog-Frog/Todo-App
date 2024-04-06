import {compare, hash} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import {Service} from 'typedi';
import {JWT_SECRET} from '../config';
import {HttpException} from "../exceptions/http.exception";
import prisma from '../libs/prismadb';
import {User} from '../interfaces/user.interface';
import {DataStoredInToken, TokenData} from '../interfaces/auth.interface';


const createToken = (user: User): TokenData => {
    const expiresIn = 60 * 60 * 24 * 7; // 7 days
    const DataStoredInToken: DataStoredInToken = {
        _id: user.id
    };
    return {
        expiresIn,
        token: sign(DataStoredInToken, JWT_SECRET, {expiresIn})
    };
}

const createHTTPcookie = (tokenData: TokenData): string => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
}

@Service()
export class AuthService {
    public async signup(userData: User): Promise<User> {
        const findUser = await prisma.user.findFirst({where: {email: userData.email}});
        if (findUser) {
            throw new HttpException(409, `Email ${userData.email} already exists`);
        }

        const findUsername = await prisma.user.findFirst({where: {name: userData.name}});
        if (findUsername) {
            throw new HttpException(409, `Username ${userData.name} already exists`);
        }

        const hashedPassword = await hash(userData.password, 10);

        const createdUser: User = await prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                hashedPassword: hashedPassword
            }
        });

        return createdUser;
    }

    public async login(userData: User): Promise<{ findUser: User; cookie: string; tokenData: TokenData }> {
        const findUser = await prisma.user.findFirst({where: {email: userData.email}});
        if (!findUser) {
            throw new HttpException(409, "The email you entered doesn't belong to an account.");
        }

        const isPasswordMatching: boolean = await compare(userData.password, findUser.hashedPassword);
        if (!isPasswordMatching) {
            throw new HttpException(409, 'Invalid email or password');
        }

        const tokenData = createToken(findUser);
        const cookie = createHTTPcookie(tokenData);

        return {findUser, cookie, tokenData};
    }

    public async logout(userData: User) {
        const findUser = await prisma.user.findFirst({where: {email: userData.email}});
        if (!findUser) {
            throw new HttpException(409, "The email you entered doesn't belong to an account.");
        }

        return "Logged out successfully";
    }
}