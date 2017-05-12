package recursion;

/**
 * Created by homr on 2017. 4. 12..
 */
public class GCD {
    public static void main(String[] args){
        System.out.println(gcd(18,27));
        System.out.println(advanced_gcd(18,27));
    }

    // 일반 최대 공약수
   public static double gcd(int m, int n){
        if(m<n){
            int tmp=m; m=n; n=tmp;
        }
        if(m%n==0)
            return n;
        else{
            return gcd(n, m%n);
        }
    }

    //  유클리드 호제법
   public static int advanced_gcd(int p, int q){
        if(q==0)
            return p;
        else
            return advanced_gcd(q,p%q);
    }
}
