import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDisplay'
})
export class TimeDisplayPipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): String {

    const givenDate = Date.parse(value as string)
    const currDate = Date.now()
    const timeDiff = (currDate - givenDate) / 1000 // Get time diff by secs

    if (timeDiff < 60) return Math.floor(timeDiff) + " Seconds Ago"
    if (timeDiff < 60 * 60) return Math.floor(timeDiff / 60) + " Minutes Ago"
    if (timeDiff < 60 * 60 * 24) return Math.floor(timeDiff / 60 / 24) + " Hours Ago"
    return formatDate(givenDate, "dd/MM/yyyy", 'en_US')
  }
}
