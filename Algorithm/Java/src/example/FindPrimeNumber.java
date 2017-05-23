package example;

/**
 * Created by homr on 2017. 5. 23..
 */
public class FindPrimeNumber {
    public static void main(String[] args){
        int count = 0;

        System.out.println("1과 1000사이에 있는 소수를 구합니다");

        System.out.print(1+" ");
        System.out.print(2+" ");

        for(int i = 1; i<=1000; i++){
            for(int j = 2; j<i; j++){
                if(i%j==0){
                    break;
                }
                if(i-1==j){
                    count++;
                    System.out.print(i+" ");
                }
            }
        }

        System.out.println(count);
    }
}
