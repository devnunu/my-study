package backjoon.ex_9613;

import java.util.Scanner;

/**
 * Created by homr on 2017. 7. 7..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int T = sc.nextInt();

        while(T!=0){
            int num = sc.nextInt();
            int sum = 0;
            int[] arr = new int[num];

            for(int i =0; i<num; i++){
                arr[i] = sc.nextInt();
            }

            for(int i=0; i<num-1; i++){
                for(int j=i+1; j<num; j++){
                    if(arr[i]<arr[j]){
                        sum += gcd(arr[j], arr[i]);
                    }else{
                        sum += gcd(arr[i], arr[j]);
                    }
                }
            }
            System.out.println(sum);

            T--;
        }
    }


    public static int gcd(int p, int q){
        if(q==0)
            return p;
        else
            return gcd(q,p%q);
    }
}
