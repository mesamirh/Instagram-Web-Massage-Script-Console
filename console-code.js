(async function InstaSoftMessenger() {
    const inputSelector = '.x1xmf6yo > div:nth-child(1)';
    const sendButtonSelector = 'div.xjqpnuy:nth-child(3)';

    // Asking user for messages (comma-separated)
    const messageInput = prompt("Enter messages to send (separated by commas):", "Sorry,Apologies,Please forgive me");
    if (!messageInput) {
        console.log("❌ No messages entered.");
        return;
    }

    // Split messages into array and trim whitespace
    const messageArray = messageInput.split(',').map(msg => msg.trim()).filter(msg => msg.length > 0);
    if (messageArray.length === 0) {
        console.log("❌ No valid messages found.");
        return;
    }

    // Ask how many times to send each message
    const repeatCount = parseInt(prompt("How many times to send EACH message?", "3"));
    if (isNaN(repeatCount) || repeatCount <= 0) {
        console.log("❌ Invalid repeat count.");
        return;
    }

    let sentMessages = 0;

    // Random delay between min and max (ms)
    function randomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (const messageText of messageArray) {
        for (let i = 0; i < repeatCount; i++) {
            const inputBox = document.querySelector(inputSelector);
            if (!inputBox) {
                console.error("❌ Input box not found.");
                return;
            }

            inputBox.focus();

            // Simulate typing with natural delays
            for (let char of messageText) {
                document.execCommand('insertText', false, char);
                await new Promise(resolve => setTimeout(resolve, randomDelay(100, 250))); // human typing
            }

            await new Promise(resolve => setTimeout(resolve, randomDelay(400, 800))); // wait for send button

            const sendButton = document.querySelector(sendButtonSelector);
            if (!sendButton) {
                console.error("❌ Send button not found.");
                return;
            }

            sendButton.click();
            sentMessages++;
            console.log(`✅ Sent: "${messageText}" (${sentMessages} total)`);

            // Anti-ban delay logic
            if (sentMessages % 5 === 0) {
                console.log("⏳ Cooling down to avoid detection...");
                await new Promise(resolve => setTimeout(resolve, randomDelay(5000, 8000)));
            } else {
                await new Promise(resolve => setTimeout(resolve, randomDelay(2000, 5000)));
            }
        }
    }

    console.log(`🎉 Done! ${sentMessages} messages sent safely.`);
})();
