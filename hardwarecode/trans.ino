void setup() {
  // put your setup code here, to run once:
pinMode(4,OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  
  //IR LED sending modulated signals at 38KHz with 33% duty cycle
digitalWrite(4, HIGH);
delayMicroseconds(8.7);
digitalWrite(4, LOW);
delayMicroseconds(17.6);

}
