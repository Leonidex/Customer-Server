import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { CustomerModule } from './customer/customer.module';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
      context: ({ request, reply }) => ({
        request,
        reply,
      }),
      playground: true,
      introspection: true, // TODO update this so that it's off in production;
    }),
    CustomerModule,
    AuthModule,
    RefreshTokenModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, providePrismaClientExceptionFilter()],
})
export class AppModule {}
