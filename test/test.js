var d = new Date('2018-5-30 20:40:00');

console.log(d);

var st = d.toLocaleString('UTC', {timeZone: 'Europe/Paris'});

console.log(st);

var tab=st.split(' ');

var part1 =  tab[0].split('-');

var part2 =  tab[1].split(':');

var date1 = new Date(part1[0],part1[1]-1,part1[2],part2[0],part2[1],part2[2]);

console.log(date1);


return 0;
