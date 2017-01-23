
import {Participant} from "../model/paticipant.interface";
import {Thread} from "../model/thread.interface";
import {Message} from "../model/message.interface";
export interface AllUserData {
  participants: Participant[];
  threads: Thread[];
  messages: Message[];
}


