package example;

/**
 * Created by homr on 2017. 5. 23..
 */
public class GCD {
    public static void main(String[] args){
        int firstNum, secondNum, range, max;
        firstNum = 9;
        secondNum = 18;
        max = 0;

        if(firstNum>secondNum){
            range = firstNum;
        }else{
            range = secondNum;
        }

        for(int i = 1; i<range; i++){
            if((firstNum%i==0)&&(secondNum%i==0)){
                max = i;
            }
        }

        System.out.println("첫 번째 수 : " + firstNum);
        System.out.println("두 번째 수 : " + secondNum);
        System.out.println("두수의 최대공약수는 : " + max);
    }
}
