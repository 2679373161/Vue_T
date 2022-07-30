var myfunction = {
 
    Confirm: function (ConfirmList) {
     //  console.log('123' + ConfirmList)
     up = 0
     down = 0
     maxChange = 0
     threshold=6
     for(var i=0;i<ConfirmList.length-1;i++){
        if (i == 0 || i != ConfirmList.length-2) {
            //开头末尾不处理
        } else if (ConfirmList[i+1]-ConfirmList[i]>=threshold) 
        {
            up++
            abnormalChange = append(abnormalChange, u[i+1].Flow-u[i].Flow)
        } else if (ConfirmList[i+1]-ConfirmList[i]<=(-threshold)) {
            down++
            abnormalChange = append(abnormalChange, u[i+1].Flow-u[i].Flow)
        } else {
            //正常变化数据
        }

     }
  
     for(var i=0;i<abnormalChange.length-1;i++){

        if (Math.Abs(float64(abnormalChange[i])) > Math.Abs(maxChange)) {
            maxChange = float64(abnormalChange[i])
        }

     }
 
    
     return  {

        up:up,
        down:down
     }


     },
    
   }

   export default myfunction