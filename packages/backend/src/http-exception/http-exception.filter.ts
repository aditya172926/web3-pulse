import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.handleException(exception);
    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      exception instanceof Error ? exception.stack : undefined
    );

    response.status(errorResponse.statusCode).json({
      ...errorResponse,
      timestamp: new Date().toISOString(),
      path: request.url
    });
  }

  private handleException(exception: unknown) {
    // HTTP exceptions
    if (exception instanceof HttpException) {
      return {
        statusCode: exception.getStatus(),
        message: exception.message,
        error: exception.getResponse()
      }
    }

    // Axios errors
    if (this.isAxiosError(exception)) {
      return this.handleAxiosError(exception);
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: exception instanceof Error ? exception.message : "Unknown Error"
    }
  }

  private handleAxiosError(error: AxiosError) {
    if (error.response) {
      // API returned an error response
      return {
        statusCode: HttpStatus.BAD_GATEWAY,
        message: "External API error",
        error: error.response.data || error.message,
        externalStatus: error.response.status
      };
    } else if (error.request) {
      // request made but no response
      return {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: "Failed to connect to external service",
        error: error.message
      };
    } else {
      // something else broke
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        messasge: "Request setup error",
        error: error.message
      };
    }
  }

  private isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
  }
}
