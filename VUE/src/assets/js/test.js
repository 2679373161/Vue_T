var myfunction = {
 
    Confirm: function (ConfirmList) {
     //  console.log('123' + ConfirmList)
    var  up = 0
    var  down = 0
    var  maxChange = 0
    var  threshold=6
    var j=0
    var abnormalChange=[]
     for(var i=0;i<ConfirmList.length-1;i++){
        if (i == 0 || i == ConfirmList.length-2) {
            //开头末尾不处理
        } else if (ConfirmList[i+1]-ConfirmList[i]>=threshold) 
        {
            up++
            abnormalChange[j]= ConfirmList[i+1]-ConfirmList[i]
            j++
        } else if (ConfirmList[i+1]-ConfirmList[i]<=(-threshold)) {
            down++
            abnormalChange[j]= ConfirmList[i+1]-ConfirmList[i]
              j++
        } else {
            //正常变化数据
        }

     }
  
     for(var i=0;i<abnormalChange.length-1;i++){

        if (Math.abs((abnormalChange[i])) > Math.abs(maxChange)) {
            maxChange = (abnormalChange[i])
        }

     }
 
    
     return  {

        up:up,
        down:down,
        maxChange:maxChange,
        abnormalChange:abnormalChange
     }


     },
    
   }

   export default myfunction