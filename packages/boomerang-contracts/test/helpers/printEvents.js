export default function printEvents(transaction) {

  console.log('------');
  for (let i = 0; i < transaction.logs.length; i++) {
    const eventName = transaction.logs[i].event;
    const eventArgs = transaction.logs[i].args;
    console.log(eventName);
    console.log(eventArgs);
    console.log('---');
  }
}