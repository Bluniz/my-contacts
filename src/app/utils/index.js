

export const isRequiredProps = async (data) => {
  const errors = [];

  const parsedData = Object.entries(data);


  parsedData.forEach((values) => {
    if(!values[1]){
      errors.push(`${values[0]} is required`)
    }
  })


  return new Promise((resolve) => {
    resolve(errors.length > 0 ? errors : null)
  })
}