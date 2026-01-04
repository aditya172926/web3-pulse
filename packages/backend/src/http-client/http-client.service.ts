import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { stringify } from 'querystring';
import { catchError, Observable, retry, throwError, timeout, TimeoutError } from 'rxjs';

export interface HttpClientOptions extends AxiosRequestConfig {
    retries?: number,
    retryDelay?: number,
    timeoutMs?: number
}

@Injectable()
export class HttpClientService {
    private readonly logger = new Logger(HttpClientService.name);

    constructor(
        private readonly httpService: HttpService
    ) {}

    post<T = any>(
        url: string,
        data?: any,
        options?: HttpClientOptions
    ): Observable<AxiosResponse<T>> {
        const {
            retries = 3,
            retryDelay = 1000,
            timeoutMs = 10000,
            ...axiosConfig
        } = options || {};

        return this.httpService.post<T>(url, data, axiosConfig).pipe(
            timeout(timeoutMs),
            retry({
                count: retries,
                delay: retryDelay,
                resetOnSuccess: true
            }),
            catchError((error) => this.handleError(error, url))
        );
    }

    get<T = any>(
        url: string,
        options?: HttpClientOptions
    ): Observable<AxiosResponse<T>> {
        const {
            retries = 3,
            retryDelay = 1000,
            timeoutMs = 10000,
            ...axiosConfig
        } = options || {};

        return this.httpService.get<T>(url, axiosConfig).pipe(
            timeout(timeoutMs),
            retry({
                count: retries,
                delay: retryDelay,
                resetOnSuccess: true
            }),
            catchError((error) => this.handleError(error, url))
        );
    }

    private handleError(error: any, url: string): Observable<never> {
        if (error instanceof TimeoutError) {
            this.logger.error(`Request timeout for url ${url}`);
            return throwError(
                () => new HttpException(
                    "Request timeout",
                    HttpStatus.REQUEST_TIMEOUT
                )
            );
        }

        if (this.isAxiosError(error)) {
            if (error.response) {
                // API returned an error response
                this.logger.error(
                    `External API error: ${error.response.status} for URL: ${url}`,
                    error.response.data
                );
                return throwError(
                    () =>
                        new HttpException(
                            {
                                message: 'External API error',
                                details:
                                    error.response.data ||
                                    error.message,
                                statusCode: error.response.status,
                            },
                            HttpStatus.BAD_GATEWAY
                        )
                );
            } else if (error.request) {
                // Request made but no response
                this.logger.error(
                    `No response from external API for URL: ${url}`,
                    error.message
                );
                return throwError(
                    () =>
                        new HttpException(
                            'Failed to connect to external service',
                            HttpStatus.SERVICE_UNAVAILABLE
                        )
                );
            }
        }

        // Generic error
        this.logger.error(`Unexpected error for URL: ${url}`, error);
        return throwError(
            () =>
                new HttpException(
                    error?.message || 'Internal server error',
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
        );
    }

    private isAxiosError(error: any): error is AxiosError {
        return error.isAxiosError === true;
    }
}