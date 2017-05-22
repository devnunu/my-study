package example;

import java.util.Random;
import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 23..
 */
public class SelectRandomNumber {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        Random r = new Random();

        int selectNum = -1;
        int targetNum = r.nextInt(100);
        int count = 0;

        while(true){
            count++;
            System.out.print("["+count+"번째 도전!"+"] : ");
            selectNum = sc.nextInt();

            if(selectNum==targetNum){
                System.out.println(count+"번만에 성공입니다!");
                break;
            }else if(selectNum<targetNum){
                System.out.println(selectNum+"보다 큽니다");
            }else{
                System.out.println(selectNum+"보다 작습니다");
            }
        }

    }
}
