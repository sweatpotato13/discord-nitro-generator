import fs from "fs";
import fetch from "cross-fetch";

function getGiftCode() {
    let code = '';
    let dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (var i = 0; i < 18; i++) {
        code = code + dict.charAt(Math.floor(Math.random() * dict.length));
    }
    return code;
}

async function checkCode(code: string) {
    const result = await fetch(`https://discordapp.com/api/v9/entitlements/gift-codes/${code}?with_application=false&with_subscription_plan=true`, {
        method: "GET"
    })
    const data = await result.json();
    if (data.message != "Unknown Gift Code" && data.message != "You are being rate limited." && data.message != "The resource is being rate limited.") {
        return true;
    }
    else {
        return false;
    }
}

function draw() {
    console.log("██████╗██╗   ██╗████████╗███████╗██╗    ██╗██╗███████╗██████╗ ");
    console.log("██╔════╝██║   ██║╚══██╔══╝██╔════╝██║    ██║██║██╔════╝██╔══██");
    console.log("██║     ██║   ██║   ██║   █████╗  ██║ █╗ ██║██║███████╗██████╔");
    console.log("██║     ██║   ██║   ██║   ██╔══╝  ██║███╗██║██║╚════██║██╔═══╝");
    console.log("╚██████╗╚██████╔╝   ██║   ███████╗╚███╔███╔╝██║███████║██║    ");
    console.log(" ╚═════╝ ╚═════╝    ╚═╝   ╚══════╝ ╚══╝╚══╝ ╚═╝╚══════╝╚═╝    ");
    console.log("                                                              ");
    console.log("Made by Cute_Wisp");
}

async function main() {
    const valid = [];
    let invalid = 0;
    while (true) {
        const code = getGiftCode();
        if (await checkCode(code) === true) {
            console.log('\x1b[36m', `FOUND CODE THAT WORKS: https://discord.gift/${code}`);
            valid.push(`https://discord.gift/${code}`);
            fs.writeFileSync(__dirname + '/codes.json', JSON.stringify(valid, null, 4));
        }
        else {
            console.log('\x1b[41m%s\x1b[0m', `Invalid: ${code} : Searching!`);
            invalid++;
        }
    }
}
draw();
main();