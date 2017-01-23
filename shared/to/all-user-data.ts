
import {Participant} from "../model/paticipant.interface";
import {Thread} from "../model/thread.interface";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";
export interface AllUserData {
  participants: Participant[];
  threads: Thread[];
  messages: Message[];
}
