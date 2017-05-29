package backjoon.ex_10886;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 28..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        int countCute = 0;
        int countNotCute = 0;

        while(num!=0){
            int data = sc.nextInt();
            if(data==1){
                countCute++;
            }else{
                countNotCute++;
            }
            num--;
        }

        if(countCute>countNotCute){
            System.out.print("Junhee is cute!");
        }else{
            System.out.print("Junhee is not cute!");
        }
    }
}
