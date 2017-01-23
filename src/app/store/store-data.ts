
import {Participant} from "../../../shared/model/paticipant.interface";
import {Thread} from "../../../shared/model/thread.interface";
import {Message} from "../../../shared/model/message.interface";

export interface StoreData {
  participants: {
    [key: number]: Participant
  };
  threads: {
    [key: number]: Thread
  };
  messages: {
    [key: number]: Message
  };
}
