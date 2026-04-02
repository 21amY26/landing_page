export type RiskLevel = 'ROUTINE' | 'URGENT' | 'EMERGENCY' | null;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
  riskLevel?: RiskLevel;
  cartItems?: CartRecommendation[];
  imageAnalysis?: string;
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isVerifiedMode: boolean;
}

export interface CartRecommendation {
  item: string;
  type: string;
  urgency: 'high' | 'medium' | 'low';
  requiresPrescription: boolean;
}

export interface FulfillmentProduct {
  id: string; // Used for keys and cart logic later
  name: string;
  platform: 'Amazon' | 'Blinkit' | 'Tata 1mg' | 'Zepto';
  price: number;
  originalPrice?: number;
  imageUrl: string;
  addToCartUrl: string; // The deep link
  deliveryTime: string;
}
