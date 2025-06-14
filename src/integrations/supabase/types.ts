export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      retailers: {
        Row: {
          added_at: string
          agent_id: string | null
          created_at: string
          description: string | null
          id: string
          last_call_date: string | null
          last_recharge_date: string | null
          mobile: string | null
          name: string
          preferred_collection_method: string | null
          project_name: string | null
          retailer_id: string
          sales_order_id: string | null
          solde: number | null
        }
        Insert: {
          added_at?: string
          agent_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_call_date?: string | null
          last_recharge_date?: string | null
          mobile?: string | null
          name: string
          preferred_collection_method?: string | null
          project_name?: string | null
          retailer_id: string
          sales_order_id?: string | null
          solde?: number | null
        }
        Update: {
          added_at?: string
          agent_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          last_call_date?: string | null
          last_recharge_date?: string | null
          mobile?: string | null
          name?: string
          preferred_collection_method?: string | null
          project_name?: string | null
          retailer_id?: string
          sales_order_id?: string | null
          solde?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "retailers_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      retailers_enhanced: {
        Row: {
          "Added at": string
          Agent_assigned: string | null
          agent_id: string | null
          Commentaire: string | null
          "Created at": string
          Description: string | null
          id: string
          inserted_at: string
          "Last Call Date": string | null
          "Last Recharge Date": string | null
          Mobile: string | null
          Name: string
          "Preferred Collection Method": string | null
          Priority: string | null
          "Project Name": string | null
          "Retailer ID": string
          "Sales Order ID": string | null
          Solde: number | null
        }
        Insert: {
          "Added at"?: string
          Agent_assigned?: string | null
          agent_id?: string | null
          Commentaire?: string | null
          "Created at"?: string
          Description?: string | null
          id?: string
          inserted_at?: string
          "Last Call Date"?: string | null
          "Last Recharge Date"?: string | null
          Mobile?: string | null
          Name: string
          "Preferred Collection Method"?: string | null
          Priority?: string | null
          "Project Name"?: string | null
          "Retailer ID": string
          "Sales Order ID"?: string | null
          Solde?: number | null
        }
        Update: {
          "Added at"?: string
          Agent_assigned?: string | null
          agent_id?: string | null
          Commentaire?: string | null
          "Created at"?: string
          Description?: string | null
          id?: string
          inserted_at?: string
          "Last Call Date"?: string | null
          "Last Recharge Date"?: string | null
          Mobile?: string | null
          Name?: string
          "Preferred Collection Method"?: string | null
          Priority?: string | null
          "Project Name"?: string | null
          "Retailer ID"?: string
          "Sales Order ID"?: string | null
          Solde?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "retailers_enhanced_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
