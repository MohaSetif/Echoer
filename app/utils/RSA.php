<?php

class RSA{
    private int $p;
    private int $q;
    private int $e;

    public function __construct(int $p, int $q, int $e)
    {
        $this->p = $p;
        $this->q = $q;
        $this->e = $e;
    }

    public function is_euclidean($a, $b){
        if($b == 0){
            return $a;
        } else {
            return $this->is_euclidean($b, $a % $b);
        }
    }

    public function mult_inv($a, $b){

    }

    public function PublicKeyGeneration($p, $q, $e){
        $n = $p*$q;
        $phi = ($p-1)*($q-1);
        if($this->is_euclidean($e, $phi) == 1){
            return [$n, $e];
        }
        return null;
    }

    public function PrivateKeyGeneration($p, $q, $e){
        $n = $p*$q;
        $phi = ($p-1)*($q-1);
        $d = $this->mult_inv($e, $phi);
        return [$n, $d];
    }
}