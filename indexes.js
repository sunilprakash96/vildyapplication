
const Items=[
     {name:"bike",rate: 100},
     {name: "car", rate: 2000},
     {name: "toys", rate: 200},
     {name: "pooh", rate: 300},
     {name: "handy", rate: 100}
    ];

    const checkfilter=Items.filter(function checkItem(item,index,arr){
        console.log(arr[index]);
        return item.name;
    });
    const checkmap=Items.map(function checkItem(item){
         return item.rate;
        
    });
    const checkfind=Items.find(function checkItem(item,index,arr){
        
        return item.rate > 100;
    });

    console.log(checkfilter);
    console.log(checkmap);
    console.log(checkfind);

    // const checkfind=


// const ages = [13, 33, 16, 40];

// function checkAdult(age) {
//   console.log('Entered function')
//   return age <= 20;
// }

// const checkage= ages.filter(checkAdult);
// console.log(checkage)
