volatile int count=0;
int changeCount=0;

void setup() {
  // put your setup code here, to run once:
    pinMode(2,INPUT);
Serial.begin(9600);

}

void loop() {

  if(digitalRead(2)==0)
{
count++;
Serial.println(count);
  delay(2000);
  changeCount++;
}
  
  if(digitalRead(3)==0)
{
count--;
Serial.println(count);
    delay(2000);
      changeCount++;
}

if(changeCount>5)
{
Serial.print("sending data ");
 Serial.println(count);
changeCount=0; 
}
  

}

