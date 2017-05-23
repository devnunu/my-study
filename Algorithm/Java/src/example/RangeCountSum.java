package example;

import java.util.Scanner;

/**
 * Created by homr on 2017. 5. 23..
 */
public class RangeCountSum {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int num;
        int count = 0;
        int sum = 0;

        System.out.print("1부터 1000 사이 숫자를 입력하세요 : ");
        num = sc.nextInt();

        for(int i = 1; i<=1000; i++){
            if(i%num==0){
                sum += i;
                count++;
            }
        }

        System.out.println("1부터 1000 사이 4의 배수의 개수 : " + count);
        System.out.println("1부터 1000 사이 4의 배수의 합 : " + sum);
    }
}
