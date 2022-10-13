export function validateLength(field = '', minlength = 0) {
    return field.length >= minlength ?  true : false;
  }

export function validateImageFormat(imageUrl = '') {

  const isPng = imageUrl.substring(11,14) === 'png' 
  || imageUrl.substring(imageUrl.length -3, imageUrl.length) === 'png';
  const isJpg = imageUrl.substring(11,14) === 'jpg' 
  || imageUrl.substring(imageUrl.length -3, imageUrl.length) === 'jpg';
  const isJpeg = imageUrl.substring(11,15) === 'jpeg' 
  || imageUrl.substring(imageUrl.length -4, imageUrl.length) === 'jpeg';;

if (isPng || isJpg || isJpeg) {
return true;
} else {
return false;
}
  
}

export function validateHasContent(field = '') {
    const fieldWithoutSpaces = String(field).trim();
    return fieldWithoutSpaces.length > 0 ?  true : false;
}

export function validateSocialNetworkUrl(socialNetwork = '', url = '') {
    if (url.includes(`https://www.${socialNetwork}.com/`)) {
      return true;
    } else {
      return false;
    }
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (`${day}-${month}-${year} ${hours}:${minutes}`)
}
