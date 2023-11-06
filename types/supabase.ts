export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      camera_ingest_config: {
        Row: {
          camera_id: string | null
          created_at: string
          end_time: string
          id: string
          start_time: string
        }
        Insert: {
          camera_id?: string | null
          created_at?: string
          end_time: string
          id?: string
          start_time: string
        }
        Update: {
          camera_id?: string | null
          created_at?: string
          end_time?: string
          id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "camera_ingest_config_camera_id_fkey"
            columns: ["camera_id"]
            isOneToOne: false
            referencedRelation: "cameras"
            referencedColumns: ["id"]
          }
        ]
      }
      cameras: {
        Row: {
          created_at: string
          external_id: string
          id: string
          location_id: string | null
          name: string
          vms_service_id: string | null
        }
        Insert: {
          created_at?: string
          external_id?: string
          id?: string
          location_id?: string | null
          name?: string
          vms_service_id?: string | null
        }
        Update: {
          created_at?: string
          external_id?: string
          id?: string
          location_id?: string | null
          name?: string
          vms_service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cameras_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cameras_vms_service_id_fkey"
            columns: ["vms_service_id"]
            isOneToOne: false
            referencedRelation: "vms_services"
            referencedColumns: ["id"]
          }
        ]
      }
      companies: {
        Row: {
          active: boolean | null
          additional_info: string | null
          address_line1: string
          address_line2: string | null
          city: string
          contact_email: string
          contact_name: string
          contact_number: string
          country: string
          id: string
          inserted_at: string
          name: string
          state: string | null
          updated_at: string
          zipcode: string | null
        }
        Insert: {
          active?: boolean | null
          additional_info?: string | null
          address_line1?: string
          address_line2?: string | null
          city?: string
          contact_email: string
          contact_name: string
          contact_number: string
          country?: string
          id?: string
          inserted_at?: string
          name: string
          state?: string | null
          updated_at?: string
          zipcode?: string | null
        }
        Update: {
          active?: boolean | null
          additional_info?: string | null
          address_line1?: string
          address_line2?: string | null
          city?: string
          contact_email?: string
          contact_name?: string
          contact_number?: string
          country?: string
          id?: string
          inserted_at?: string
          name?: string
          state?: string | null
          updated_at?: string
          zipcode?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          active: boolean
          additional_info: string | null
          address_line1: string
          address_line2: string | null
          city: string
          company_id: string
          country: string
          id: string
          inserted_at: string
          name: string
          state: string | null
          updated_at: string
          zipcode: string | null
        }
        Insert: {
          active?: boolean
          additional_info?: string | null
          address_line1: string
          address_line2?: string | null
          city: string
          company_id: string
          country: string
          id?: string
          inserted_at?: string
          name: string
          state?: string | null
          updated_at?: string
          zipcode?: string | null
        }
        Update: {
          active?: boolean
          additional_info?: string | null
          address_line1?: string
          address_line2?: string | null
          city?: string
          company_id?: string
          country?: string
          id?: string
          inserted_at?: string
          name?: string
          state?: string | null
          updated_at?: string
          zipcode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_company_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_company_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_memberships"
            referencedColumns: ["company_id"]
          }
        ]
      }
      notes: {
        Row: {
          id: number
          title: string | null
        }
        Insert: {
          id?: number
          title?: string | null
        }
        Update: {
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_company: {
        Row: {
          company_id: string
          inserted_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id: string
          inserted_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string
          inserted_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_company_company_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_company_company_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_memberships"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "user_company_user_fk"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_company_roles: {
        Row: {
          company_id: string
          id: string
          inserted_at: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          company_id: string
          id?: string
          inserted_at?: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          company_id?: string
          id?: string
          inserted_at?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_company_roles_company_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_company_roles_company_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_memberships"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "user_company_roles_user_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      videos: {
        Row: {
          camera_id: string | null
          created_at: string
          end_time: string
          file_path: string
          id: string
          start_time: string
        }
        Insert: {
          camera_id?: string | null
          created_at?: string
          end_time: string
          file_path: string
          id?: string
          start_time: string
        }
        Update: {
          camera_id?: string | null
          created_at?: string
          end_time?: string
          file_path?: string
          id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "videos_camera_id_fkey"
            columns: ["camera_id"]
            isOneToOne: false
            referencedRelation: "cameras"
            referencedColumns: ["id"]
          }
        ]
      }
      vms_credentials: {
        Row: {
          created_at: string
          credentials: Json
          id: string
          user_id: string | null
          vms_service_id: string | null
        }
        Insert: {
          created_at?: string
          credentials: Json
          id?: string
          user_id?: string | null
          vms_service_id?: string | null
        }
        Update: {
          created_at?: string
          credentials?: Json
          id?: string
          user_id?: string | null
          vms_service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vms_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vms_credentials_vms_service_id_fkey"
            columns: ["vms_service_id"]
            isOneToOne: false
            referencedRelation: "vms_services"
            referencedColumns: ["id"]
          }
        ]
      }
      vms_services: {
        Row: {
          api_endpoint: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          api_endpoint?: string
          created_at?: string
          id?: string
          name?: string
        }
        Update: {
          api_endpoint?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      company_memberships: {
        Row: {
          company_id: string | null
          company_name: string | null
          email: string | null
          user_id: string | null
          user_role: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "user_company_user_fk"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      add_user_to_company: {
        Args: {
          p_user_id: string
          p_company_id: string
          p_role: Database["public"]["Enums"]["user_role"]
        }
        Returns: undefined
      }
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_companies_for_authenticated_user: {
        Args: Record<PropertyKey, never>
        Returns: string[]
      }
      get_company_users_with_roles: {
        Args: {
          p_company_id: string
        }
        Returns: {
          user_id: string
          email: string
          created_at: string
          banned_until: string
          role: Database["public"]["Enums"]["user_role"]
          company_id: string
        }[]
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_id_by_email: {
        Args: {
          user_email: string
        }
        Returns: string
      }
      is_admin_for_company: {
        Args: {
          p_user_id: string
          p_company_id: string
        }
        Returns: boolean
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
      update_user_company_membership: {
        Args: {
          p_user_id: string
          p_company_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      user_role: "user" | "admin" | "manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
