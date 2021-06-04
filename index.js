const fs = require('fs')
const fileContents = fs.readFileSync('./data/skill-QA-ACUBED-Anthem-ILegato-PLegato.json', 'utf8')

try {
  const data = JSON.parse(fileContents)
  const dialog_nodes = data.dialog_nodes
  let responses = [];
  dialog_nodes.forEach(node => {      
      if((node.type == "standard" || node.type == "response_condition") && node.output && node.output.generic){          
        let generics = node.output.generic;        
        generics.forEach(generic => {
            if(generic.values) {
                let values = generic.values
                values.forEach(value => {
                    responses.push(value.text)
                })
            }
        })
      }
  })  
console.log("printing the output",responses.length)
responses.forEach((response, index)=>{
    fs.appendFile('./output/responses1.txt', index+":::"+response+"\n", 'utf8', function(err1) {
        if (err1) {
          console.log('Some error occured - file either not saved or corrupted file saved.',err1);
        } else {
          console.log('It\'s saved!');
        }
    })
})

} catch(err) {
  console.error(err)
}