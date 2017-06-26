package backjoon.ex_10757;

import java.util.Scanner;

/**
 * Created by homr on 2017. 6. 26..
 */
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String str1 = sc.next();
        String str2 = sc.next();

        int[] arr1 = new int[str1.length()];
        int[] arr2 = new int[str2.length()];

        reverse(str1, arr1);
        reverse(str2, arr2);

        int maxSize = arr1.length>arr2.length ? arr1.length :arr2.length;
        int minSize = arr1.length<arr2.length ? arr1.length :arr2.length;
        int[] result = new int[maxSize];
        int C = 0;

        for(int i = 0; i<minSize; i++){
            int sum = arr1[i]+arr2[i]+C;

            if(sum>=10){
                result[i] = sum%10;
                C = 1;
            }else{
                result[i] = sum;
                C = 0;
            }
        }

        for(int i=minSize; i<maxSize; i++){
            if(arr1.length>arr2.length){
                result[i]=arr1[i]+C;
                C = 0;
            }else{
                result[i]=arr2[i]+C;
                C = 0;
            }
        }

        if(C==1){
            System.out.print(C);
        }

        for(int i = result.length-1; i>=0; i--){
            System.out.print(result[i]);
        }


    }

    public static void reverse(String str, int[] arr){
        for(int i=str.length()-1; i>=0; i--) {
            arr[str.length()-1-i] = str.charAt(i) - '0';
        }
    }
}
