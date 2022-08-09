// type CaptchaProps = {
//     width?: number;
//     height?: number;
//     backgroundColorMin?: number;
//     backgroundColorMax?: number;
//     fontSizeMin?: number;
//     fontSizeMax?: number;
//     colorMin?: number;
//     colorMax?: number;
//     lineColorMin?: number;
//     lineColorMax?: number;
// }

// export class VerifyObj {
//     constructor (options: CaptchaProps) {
//         const { 
//             width, 
//             height, 
//             backgroundColorMin,
//             backgroundColorMax,
//             fontSizeMin,
//             fontSizeMax,
//             colorMin,
//             colorMax,
//             lineColorMin,
//             lineColorMax
//         } = Object.assign({
//             width: 120,
//             height: 40,
//             backgroundColorMin: 255,
//             backgroundColorMax: 255,
//             fontSizeMin: 25,
//             fontSizeMax: 30,
//             colorMin: 0,
//             colorMax: 160,
//             lineColorMin: 150,
//             lineColorMax: 255
//         }, options);
    
//     }
//     // 生成4个随机数
//     createdCode () {
//         const len = 4;
//         const codeList = [];
//         const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789';
//         const charsLen = chars.length;
//         for (let i = 0; i < len; i++) {
//             codeList.push(chars.charAt(Math.floor(Math.random() * charsLen)))
//         }
//         setIdentifyCode(codeList.join(''));
//         console.log(identifyCode);
//         this.drawPic();
//     }

//     // 生成一个随机数
//     randomNum (min: number, max: number) {
//         return Math.floor(Math.random() * (max - min) + min)
//     }
//     // 生成一个随机的颜色
//     randomColor (min: number, max: number) {
//         const r = this.randomNum(min, max)
//         const g = this.randomNum(min, max)
//         const b = this.randomNum(min, max)
//         return 'rgb(' + r + ',' + g + ',' + b + ')'
//     }

//     drawPic () {
//         const canvas = document.getElementById('s-canvas') as HTMLCanvasElement;
//         const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
//         ctx.textBaseline = 'bottom'
//         // 绘制背景
//         ctx.fillStyle = this.randomColor(backgroundColorMin, backgroundColorMax)
//         ctx.fillRect(0, 0, width, height)
//         // 绘制文字
//         for (let i = 0; i < identifyCode.length; i++) {
//             this.drawText(ctx, identifyCode[i], i)
//         }
//         this.drawLine(ctx)
//         this.drawDot(ctx)
//     }

//     drawText (ctx: CanvasRenderingContext2D, txt: string, i: number) {
//         ctx.fillStyle = this.randomColor(colorMin, colorMax)
//         ctx.font = this.randomNum(fontSizeMin, fontSizeMax) + 'px SimHei'
//         const x = (i + 1) * (width / (identifyCode.length + 1))
//         const y = this.randomNum(fontSizeMax, height - 5)
//         var deg = this.randomNum(-45, 45)
//         // 修改坐标原点和旋转角度
//         ctx.translate(x, y)
//         ctx.rotate(deg * Math.PI / 180)
//         ctx.fillText(txt, 0, 0)
//         // 恢复坐标原点和旋转角度
//         ctx.rotate(-deg * Math.PI / 180)
//         ctx.translate(-x, -y)
//     }

//     // 绘制干扰线
//     drawLine (ctx: CanvasRenderingContext2D) {
//         for (let i = 0; i < 5; i++) {
//         ctx.strokeStyle = this.randomColor(lineColorMin, lineColorMax)
//         ctx.beginPath()
//         ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height))
//         ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height))
//         ctx.stroke()
//         }
//     }

//     // 绘制干扰点
//     drawDot (ctx: CanvasRenderingContext2D) {
//         for (let i = 0; i < 80; i++) {
//         ctx.fillStyle = this.randomColor(0, 255)
//         ctx.beginPath()
//         ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI)
//         ctx.fill()
//         }
//     }
// }



export function isPhone (phone: string) {
    return /^1[3-9]\d{9}$/.test(phone);
}
