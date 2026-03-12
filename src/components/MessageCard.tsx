"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { MessageDoc } from "@/model/User.model";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import dayjs from "dayjs";
import { Ellipsis, Ghost, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatTime } from "@/helpers/FormatTime";

type MessageCardProp = {
  message: MessageDoc;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProp) => {
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id.toString()}`,
      );
      toast.success(response.data.message);
      onMessageDelete(message._id.toString());
    } catch (error) {
      toast.error("Failed to delete message!");
    }
  };

  return (
    <Card className="card-bordered hover:bg-gray-300 hover:border-4 hover:border-black duration-500">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2 w-auto h-8 rounded-full">
              <Ghost className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
              Anonymous
              </span>
        </div>
          
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Ellipsis className="font-extrabold" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="text-red-400"
                    >
                      Delete Message <DropdownMenuShortcut>  <Trash2 className="mr-2 h-4 w-4" /> </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </AlertDialogTrigger>

                  <AlertDialogContent
                    className="ease-in-out">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this message.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-400 text-white"
                        onClick={handleDeleteConfirm}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

      </CardHeader>

      <CardContent>
        <div className="flex justify-between ">
          <CardTitle>{message.content}</CardTitle>
        </div>
        </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground">
        {formatTime(message.createdAt)}
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
