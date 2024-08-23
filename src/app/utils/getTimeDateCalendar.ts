
export const getTimeCite = (date: string) =>  { 
    const dateHour = new Date(date);
    const hour = dateHour.getHours().toString().padStart(2, '0');
    const minutes = dateHour.getMinutes().toString().padStart(2, '0');
    const horaFormateada = `${hour}:${minutes}`;
    return horaFormateada
}