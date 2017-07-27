var bob;
(function (bob) {
    (function () {
        var widget = {
            id: 0,
            name: 'Bob',
            setupWidget: function (element) {
                var recognition;
                if ('webkitSpeechRecognition' in window) {
                    recognition = new webkitSpeechRecognition();
                    recognition.continuous = true;
                    recognition.interimResults = true;
                    recognition.lang = 'en-GB';
                    recognition.start();
                    recognition.onresult = function (event) {
                        var interim_transcript = '';
                        var final_transcript = '';
                        for (var i = event.resultIndex; i < event.results.length; ++i) {
                            if (event.results[i].isFinal) {
                                final_transcript += event.results[i][0].transcript;
                            }
                            else {
                                interim_transcript += event.results[i][0].transcript;
                            }
                        }
                        //recognition.stop();
                        if (final_transcript !== '') {
                            createMessage(final_transcript.trim(), element, true, recognition);
                        }
                    };
                }
                ;
                $('.message-input', element).keydown(function (event) {
                    if (event.keyCode == 13) {
                        $(".btn-msg-send", element).click();
                    }
                });
                $('.btn-msg-send', element).click(function () {
                    var message = $('.message-input', element).val();
                    $('.message-input', element).val('');
                    createMessage(message, element, true, recognition);
                });
                $('.myTextbox', element).focus();
            },
            removeWidget: function (element) {
            },
            loadData: function (element) {
            },
            saveCustomisation: function (element, customisation) {
                customisation['mysetting'] = $('.myTextbox', element).val();
            },
            restoreCustomisation: function (element, customisation) {
                $('.myTextbox', element).val(customisation['mysetting']);
            }
        };
        WidgetManager.Instance.registerWidget(widget);
        function createMessage(message, element, fromUser, recognition) {
            var classToAttach = fromUser ? 'user-message' : 'bob-message';
            $('.message-details', element).append('<div class="' + classToAttach + '"><div class="direct-chat-text" >' + message + '</div></div>');
            scrollToBottomOfMessages(element);
            var messageManager = new MessageManager();
            messageManager.SendMessage(element, message);
            //recognition.start();
        }
        function scrollToBottomOfMessages(element) {
            var objDiv = $('.message-details', element).get(0);
            objDiv.scrollTop = objDiv.scrollHeight;
        }
        var MessageManager = (function () {
            function MessageManager() {
            }
            MessageManager.prototype.SendMessage = function (element, message) {
                var replyMessage = 'I don\'t understand';
                switch (message) {
                    case 'hello': {
                        replyMessage = 'hello';
                        break;
                    }
                    case 'how are you': {
                        replyMessage = 'I\'m good thanks';
                        break;
                    }
                    case 'what time is it': {
                        var currentDate = new Date();
                        var hours = currentDate.getHours();
                        var hours12 = hours > 12 ? hours - 12 : hours;
                        if (hours12 === 0) {
                            hours12 = 12;
                        }
                        var minutes = currentDate.getMinutes();
                        var ampm = 'AM';
                        if (hours > 12) {
                            ampm = 'PM';
                        }
                        replyMessage = 'it\'s ' + hours12 + ':' + minutes + ' ' + ampm;
                        break;
                    }
                    case 'goodbye': {
                        replyMessage = 'bye';
                        break;
                    }
                    case '': {
                        replyMessage = 'your message is blank';
                        break;
                    }
                }
                setTimeout(function () {
                    $('.message-details', element).append('<div class="bob-message"><div class="direct-chat-text" >' + replyMessage + '</div></div>');
                    scrollToBottomOfMessages(element);
                    if ('speechSynthesis' in window) {
                        var speechSynthesis = window.speechSynthesis;
                        var msg = new SpeechSynthesisUtterance();
                        //var voices = speechSynthesis.getVoices();
                        //msg.voice = voices[5]; // google male
                        msg.rate = 1;
                        msg.pitch = 1;
                        msg.text = replyMessage;
                        speechSynthesis.speak(msg);
                    }
                    if (replyMessage === 'bye') {
                        setTimeout(function () {
                            window.close();
                        }, 1000);
                    }
                }, 1000);
            };
            return MessageManager;
        }());
    })();
    //$(element).find('button').click(function () {
    //    if (!('webkitSpeechRecognition' in window)) {
    //        $('.myTextbox', element).val('your browser is rubbish')
    //    } else {
    //        $('.myTextbox', element).val('your browser is great!')
    //        var recognition = new webkitSpeechRecognition();
    //        recognition.continuous = true;
    //        recognition.interimResults = true;
    //        recognition.lang = 'en-GB';
    //        recognition.start();
    //        recognition.onresult = function (event) {
    //            var interim_transcript = '';
    //            var final_transcript = '';
    //            for (var i = event.resultIndex; i < event.results.length; ++i) {
    //                if (event.results[i].isFinal) {
    //                    final_transcript += event.results[i][0].transcript;
    //                } else {
    //                    interim_transcript += event.results[i][0].transcript;
    //                }
    //            }
    //            //final_transcript = capitalize(final_transcript);
    //            //final_span.innerHTML = linebreak(final_transcript);
    //            //interim_span.innerHTML = linebreak(interim_transcript);
    //            $('.myTextbox', element).val(final_transcript)
    //        };
    //    };
    //});
})(bob || (bob = {}));
