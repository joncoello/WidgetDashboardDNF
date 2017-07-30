/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

import { BobWidget } from './main'

describe("As a jasmine test", function () {
    var a;

    it("I can run", function () {
        a = true;

        expect(a).toBe(true);
    });

});

describe("MessageManager", function () {

    it("Can create", function () {

        var element : Element = undefined;
        var receiver : BobWidget.IMessageReceiver = {
            messageReceived: null
        };

        var mm = new BobWidget.MessageManager(element, receiver);

        //expect(mm).toBeTruthy();
    });

}); 