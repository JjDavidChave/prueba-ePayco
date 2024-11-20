import { ErrorCode, ErrorType } from './lib/error/error.type';

const subdomain = 'HRM';

const HRMErrors = {
  USER_NOT_EXISTS: (): ErrorCode => ({
    code: '0001',
    title: 'Invalid users',
    subdomain,
    description: 'Invalid users',
    httpCode: 400,
    type: ErrorType.PAYLOAD_CONTENT_ERROR,
  }),
  USER_UPDATE_NOT_EXISTS: (): ErrorCode => ({
    code: '0002',
    title: 'Invalid users',
    subdomain,
    description: 'Invalid users',
    httpCode: 400,
    type: ErrorType.PAYLOAD_CONTENT_ERROR,
  }),
  WALLET_UPDATE_NOT_EXISTS: (): ErrorCode => ({
    code: '0003',
    title: 'Invalid wallet',
    subdomain,
    description: 'Invalid wallet',
    httpCode: 400,
    type: ErrorType.PAYLOAD_CONTENT_ERROR,
  }),
  WALLET_NOT_EXISTS: (): ErrorCode => ({
    code: '0004',
    title: 'Invalid wallet',
    subdomain,
    description: 'Invalid wallet',
    httpCode: 400,
    type: ErrorType.PAYLOAD_CONTENT_ERROR,
  }),
  TRANSACTION_NOT_EXISTS: (): ErrorCode => ({
    code: '0005',
    title: 'Invalid transaction',
    subdomain,
    description: 'Invalid transaction',
    httpCode: 400,
    type: ErrorType.PAYLOAD_CONTENT_ERROR,
  }),
  TRANSACTION_UPDATE_NOT_EXISTS: (): ErrorCode => ({
    code: '0006',
    title: 'Invalid transaction',
    subdomain,
    description: 'Invalid transaction',
    httpCode: 400,
    type: ErrorType.PAYLOAD_CONTENT_ERROR,
  }),
};

export default HRMErrors;
