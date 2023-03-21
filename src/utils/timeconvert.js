export const timeConvert = (time) => {
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let newDate = new Date();
    let newhours = newDate.getHours();
    let newminutes = newDate.getMinutes();
    // let newseconds = newDate.getSeconds();

    const finalHrs = newhours - hours;
    const finalMins = newminutes - minutes;

    if(finalHrs === 0 && finalMins === 0 ) {
        return `${seconds} seconds ago`;
    }

    if(finalHrs === 0) {
        return `${finalMins} minutes and ${seconds} seconds ago`;
    }

    if(finalMins === 0) {
        return `${finalHrs} hours and ${seconds} seconds ago`;
    }

}