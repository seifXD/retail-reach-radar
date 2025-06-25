
export interface Task {
  id: number;
  retailerName: string;
  retailerId: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
  taskType: string;
  description: string;
  outcome?: string;
  comment?: string;
  progress?: number; // Progress percentage (0-100)
}

export interface RetailerDetails {
  id: string;
  name: string;
  target: number;
  progress: number;
  lastRecharge: string;
  rechargeMethod: string;
  creditScore: number;
  accountStatus: "Active" | "Inactive" | "Suspended";
  cashInMode: "Enabled" | "Disabled";
  deviceModel: "POS" | "App";
  walletStatus: "Active" | "Inactive" | "Pending";
}
