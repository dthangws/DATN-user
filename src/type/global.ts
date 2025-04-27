export type ErrorResponse = {
  error: {
    data: {
      error: {
        message: string;
        error: string;
        status: number;
      };
      statusCode: number;
      timestamp: string;
    };
    status: number;
  };
};

export type PaymentStatusType = "pending" | "completed" | "failed";

export type UserStatusType = "pending" | "active" | "inactive" | "blocked";

export type LevelStatusType = "Silver" | "Gold" | "Platinum" | "Diamond";

export type OrderStatusType =
  | "active"
  | "draft"
  | "pending"
  | "completed"
  | "cancelled";

export type TransactionTypeType =
  | "deposit"
  | "withdrawal"
  | "purchase"
  | "sale"
  | "referral";

export type TransactionStatusType =
  | "active"
  | "draft"
  | "pending"
  | "completed"
  | "failed";

export type ReferralStatusType =
  | "active"
  | "draft"
  | "pending"
  | "paid"
  | "cancelled";
