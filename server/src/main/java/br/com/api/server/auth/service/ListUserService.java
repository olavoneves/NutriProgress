package br.com.api.server.auth.service;

import br.com.api.server.auth.domain.dto.UserDetailsData;
import br.com.api.server.user.domain.model.User;
import br.com.api.server.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ListUserService {

    private final UserRepository userRepository;

    public ListUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetailsData listUser(User user) {
        return new UserDetailsData(user);
    }
}
