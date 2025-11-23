import { MessageDoc } from "@/model/User.model"


export interface ApiResponse {
    success: boolean,
    message: string,
    isAcceptingMessages?: boolean,
    data?: Array <MessageDoc>
}
