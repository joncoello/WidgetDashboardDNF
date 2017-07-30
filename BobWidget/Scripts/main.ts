interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    SpeechSynthesisUtterance: any;
}

module BobWidget {

    "use strict";
    
    const { webkitSpeechRecognition }: IWindow = <IWindow>window;
    const { SpeechSynthesisUtterance }: IWindow = <IWindow>window;

    class MessageManager {

        constructor(private element: Element, private messageReceiver: IMessageReceiver) {

            // message received
            this.messageReceiver.messageReceived = (message: string) => {
                $(".message-input", element).val("");
                this.createMessage(message, element, true);
            };
            
        }

        private createMessage(message: string, element: Element, fromUser: boolean): void {

            var classToAttach = fromUser ? "user-message" : "bob-message";

            $(".message-details", element).append("<div class='" + classToAttach + "'><div class='direct-chat-text' >"
                + message + "</div></div>");

            this.scrollToBottomOfMessages(element);

            this.sendMessage(element, message);

        }

        private sendMessage(element: Element, message: string): void {

            var replyMessage = "I don\"t understand";

            switch (message) {

                case "hello": {
                    replyMessage = "hello";
                    break;
                }

                case "how are you": {
                    replyMessage = "I\"m good thanks";
                    break;
                }

                case "what time is it": {
                    var currentDate = new Date();
                    var hours = currentDate.getHours();
                    var hours12 = hours > 12 ? hours - 12 : hours;
                    if (hours12 === 0) {
                        hours12 = 12;
                    }
                    var minutes = currentDate.getMinutes();
                    var ampm = "AM";
                    if (hours > 12) {
                        ampm = "PM";
                    }
                    replyMessage = "it\"s " + hours12 + ":" + minutes + " " + ampm;
                    break;
                }

                case "goodbye": {
                    replyMessage = "bye";
                    break;
                }

                case "": {
                    replyMessage = "your message is blank";
                    break;
                }

            }

            setTimeout(() => {

                $(".message-details", element).append("<div class='bob-message'><div class='direct-chat-text' >"
                    + replyMessage + "</div></div>");
                this.scrollToBottomOfMessages(element);

                if ("speechSynthesis" in window) {

                    var speechSynthesis = (<any>window).speechSynthesis;

                    var msg = new SpeechSynthesisUtterance();
                    // var voices = speechSynthesis.getVoices();
                    // msg.voice = voices[5]; // google male
                    msg.rate = 1;
                    msg.pitch = 1;
                    msg.text = replyMessage;
                    speechSynthesis.speak(msg);

                }

                if (replyMessage === "bye") {
                    setTimeout(() => {
                        window.close();
                    }, 1000);
                }

            }, 1000);
        }

        private scrollToBottomOfMessages(element: Element): void {
            var objDiv = $(".message-details", element).get(0);
            objDiv.scrollTop = objDiv.scrollHeight;
        }

    }

    interface IMessageReceiver {
        messageReceived: (message: string) => void;
    }

    class MessageReceiver implements IMessageReceiver {

        public messageReceived: (message: string) => void;

        constructor(sendButton: JQuery, messageInput: JQuery) {

            var recognition;

            // speech input
            if ("webkitSpeechRecognition" in window) {
                
                recognition = new webkitSpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = "en-GB";

                recognition.start();

                recognition.onresult = (event: any) => {
                    var interim_transcript = "";
                    var final_transcript = "";

                    for (var i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            final_transcript += event.results[i][0].transcript;
                        } else {
                            interim_transcript += event.results[i][0].transcript;
                        }
                    }

                    var message = final_transcript.trim();

                    if (message !== "") {
                        this.messageReceived(message);
                    }

                };

            };

            // keyboard input
            sendButton.click(() => {
                var message = messageInput.val();
                this.messageReceived(message);
            });

            // enter key behaviour
            messageInput.keydown(function (event: any) {
                if (event.keyCode === 13) {
                    sendButton.click();
                }
            });
            
        }

    }
    
    let widget: WidgetComponent = {
        id: 0,
        name: "Bob",
        setupWidget: (element: Element) => {
            let messageReceiver : IMessageReceiver = new MessageReceiver($(".btn-msg-send", element), $(".message-input", element));
            let messageManager : MessageManager = new MessageManager(element, messageReceiver);
        },
        removeWidget: (element: Element) => {
            // not used
        },
        loadData: (element: Element) => {
            // not used
        },
        saveCustomisation: (element: any, customisation: { [id: string]: any }) => {
            customisation["mysetting"] = $(".myTextbox", element).val();
        },
        restoreCustomisation: (element: any, customisation: { [id: string]: any }) => {
            $(".myTextbox", element).val(customisation["mysetting"]);
        }
    };

    WidgetManager.Instance.registerWidget(widget);

}